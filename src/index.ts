import { transform } from 'what-the-pug';
import { promisify } from 'util';
import { readFile, writeFile } from 'fs';

const OPTIONS = {
  IN: '-i',
  OUT: '-o',
  ENCODING: 'utf8'
};

const readFileAsync = promisify( readFile ),
  writeFileAsync = promisify( writeFile );

async function main() {

  const [ , , ...args ] = process.argv;

  let filenameIn = '', filenameOut = '';

  for ( let i = 0; i < args.length - 1; i++ ) {

    if ( OPTIONS.IN === args[ i ] ) {
      filenameIn = args[ i + 1 ];
    }

    if ( OPTIONS.OUT === args[ i ] ) {
      filenameOut = args[ i + 1 ];
    }
  }

  const input = await ( filenameIn.length ? readFileAsync( filenameIn, OPTIONS.ENCODING ) : stdin() );
  const output = transform( input ).join( '\n' );


  filenameOut.length ? await writeFileAsync( filenameOut, output, OPTIONS.ENCODING ) : process.stdout.write( output );
}


function stdin(): Promise<string> {
  return new Promise( ( resolve, reject ) => {

    let data = '';

    process.stdin.setEncoding( OPTIONS.ENCODING );
    process.stdin.on( 'error', reject );

    process.stdin.on( 'readable', () => {

      let chunk;

      while ( ( chunk = process.stdin.read() ) !== null ) {
        data += chunk;
      }

    } );

    process.stdin.on( 'end', () => resolve( data ) );

  } );
}

main();