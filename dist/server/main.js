//      
const Rx =  require('rxjs');

                                            
                                                          
                                                            
                                                             

class Server {

                  
                

  constructor (server              , port        ) {
    this._server = server;
    this._port = port;
  }

  listen ()               {
    this._server.listen(this._port);
  }

  get (path        )                          {
    return Rx.Observable.create((observe) => {
      this._server.get(path, (req, res) => {
        observe.next({ req, res });
      });
    });
  }
}

//      
const SERVER_PORT         = process.env.SERVER_PORT || 8000;

//      
const express =  require('express');
function main () {
  const server = new Server(express(), SERVER_PORT);
  server.listen();
  server.get('*').subscribe(({ req, res }) => {
    res.status(200).send('Hello World!');
  });
}

main();
