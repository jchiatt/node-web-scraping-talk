import { jchiattConfig } from './config/jchiatt.config';
import { typicodeConfig } from './config/typicode.config';
import { initHttpFetcher } from './fetchers/http';
import { htmlParser } from './parsers/html.parser';
import { todosParser } from './parsers/todos.parser';

async function main() {
  const httpFetcher = initHttpFetcher();

  const todos = await httpFetcher(typicodeConfig.url, typicodeConfig);
  const parsedTodos = await todosParser(todos);

  const response = await httpFetcher(jchiattConfig.url, jchiattConfig);
  const title = await htmlParser(response);

  console.log({ report: { title, parsedTodos } });
}

main();
