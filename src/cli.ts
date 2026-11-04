#!/usr/bin/env node
import { CalcError, evaluate } from './calculator.js';

const expression = process.argv.slice(2).join(' ');
if (!expression) {
  console.error('Использование: calc "2 + 3"');
  process.exit(2);
}
try {
  console.log(String(evaluate(expression)));
} catch (error) {
  if (error instanceof CalcError) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }
  throw error;
}
