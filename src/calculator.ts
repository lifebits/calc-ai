/** Ошибка вычисления: деление на ноль, нечисловой ввод, неизвестная операция. */
export class CalcError extends Error {}

export type Operator = '+' | '-' | '*' | '/' | '^';

const OPERATORS: readonly Operator[] = ['+', '-', '*', '/', '^'];

export function isOperator(value: string): value is Operator {
  return (OPERATORS as readonly string[]).includes(value);
}

/** Число из строки: целое или дробное, с точкой или запятой. */
export function parseNumber(text: string): number {
  const normalized = text.trim().replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) throw new CalcError(`не число: «${text}»`);
  return Number(normalized);
}

/** CLC-T01, CLC-T02, calc-1: одна операция над двумя числами. */
export function apply(a: number, op: Operator, b: number): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) throw new CalcError('деление на ноль');
      return a / b;
    case '^': {
      const result = a ** b;
      if (!Number.isFinite(result)) throw new CalcError(`степень не определена: ${a} ^ ${b}`);
      return result;
    }
  }
}

/** Выражение вида «2 + 3», «2,5 * 4» или «2 ^ 10»: число, операция, число. */
export function evaluate(expression: string): number {
  const match = /^\s*(-?[\d.,]+)\s*([+\-*/^])\s*(-?[\d.,]+)\s*$/.exec(expression);
  if (!match) throw new CalcError(`не понимаю выражение: «${expression}»`);
  const [, left, op, right] = match;
  if (!isOperator(op)) throw new CalcError(`неизвестная операция: «${op}»`);
  return apply(parseNumber(left), op, parseNumber(right));
}
