// @flow

import { type FeathersError } from '@feathersjs/errors';

export default function render(error: FeathersError) {
  return `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            >
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>TF2Pickup API</title>
            <style>
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
            </style>
        </head>
        
        <body>
            <div id="app">
                <div class="card">
                    <span class="title">
                        <span class="code">${error.code}</span>
                        
                        <span class="name">${error.name}</span>
                    </span>
                    
                    <span class="message">
                        ${error.message}
                    </span>
                </div>
            </div>
        </body> 
    </html>
  `;
}