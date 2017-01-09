# MIT License
#
# Copyright (c) 2016 Samuel Rounce
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

#!/usr/bin/env bash

SPATH="$(cd $(dirname "$0") && pwd -P)"
CONFIG_PATH=${1:-$SPATH/localkube.json}
SECRET_NAME=${2:-docker-registry-secret}
if [[ ! -f $CONFIG_PATH ]]; then
  echo "Unable to locate service account config JSON: $CONFIG_PATH";
  exit 1;
fi

kubectl create secret docker-registry $SECRET_NAME  \
  --docker-server "https://gcr.io" \
  --docker-username _json_key \
  --docker-email not@val.id \
  --docker-password="`cat $CONFIG_PATH`" ${@:3}