import { FeathersError } from '@feathersjs/errors';
import PrettyError from 'pretty-error';

const re = new PrettyError();
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
                
  #app {
    width: 100vw;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
                
  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    background-color: #ffffff;
  }
                
  .title {
    display: flex;
    line-height: 2.5rem;
  }
                
  .code {
    font-size: 2rem;
    padding-right: 10px;
  }
                
  .name {
    flex: 1;
    font-size: 1.75rem;
  }
                
  .message {
    font-size: 1.25rem;
  }
`;
const head = `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Error | TF2Pickup API</title>
    <style>
      ${styles}
    </style>
  </head>
`;

re.withoutColors();

export default function render(error: FeathersError<number, string>) {
  return `
    <!doctype html>
    <html lang="en">
        ${head}
        
        <body>
            <div id="app">
                <div class="card">
                    <span class="title">
                        <span class="code">${error.code}</span>
                        
                        <span class="name">${error.name}</span>
                    </span>
                    
                    <span class="message">
                        ${re.render(error)}
                    </span>
                </div>
            </div>
        </body> 
    </html>
  `;
}
