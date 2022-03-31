import fs from 'fs';
const fsPromises = fs.promises;

export async function readlevel(level) {
    const result = await fsPromises.readFile('./levels/' + level + '.json', 'utf-8');
    const endResult = JSON.parse(result);
    // console.log(endResult);
    return endResult;
}