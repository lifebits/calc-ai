import { describe, expect, it } from 'vitest';
import { apply, CalcError, evaluate, parseNumber } from '../src/calculator';

describe('сложение и вычитание (CLC-T01)', () => {
  it('складывает и вычитает целые и дробные', () => {
    expect(apply(2, '+', 3)).toBe(5);
    expect(apply(5, '-', 7)).toBe(-2);
    expect(evaluate('2,5 + 0,5')).toBe(3);
  });
});

describe('умножение и деление (CLC-T02)', () => {
  it('умножает и делит', () => {
    expect(evaluate('6 * 7')).toBe(42);
    expect(evaluate('7 / 2')).toBe(3.5);
  });

  it('деление на ноль — ошибка, а не бесконечность', () => {
    expect(() => evaluate('1 / 0')).toThrow(CalcError);
  });
});

describe('возведение в степень (calc-1)', () => {
  it('целая степень', () => {
    expect(apply(2, '^', 10)).toBe(1024);
    expect(evaluate('3 ^ 3')).toBe(27);
  });

  it('дробное основание', () => {
    expect(evaluate('2,5 ^ 2')).toBe(6.25);
    expect(evaluate('0.5 ^ 3')).toBe(0.125);
  });

  it('степень ноль', () => {
    expect(evaluate('7 ^ 0')).toBe(1);
    expect(evaluate('0 ^ 0')).toBe(1);
  });

  it('отрицательная степень', () => {
    expect(evaluate('2 ^ -1')).toBe(0.5);
    expect(evaluate('4 ^ -2')).toBe(0.0625);
  });

  it('неопределённая степень — ошибка, а не бесконечность', () => {
    expect(() => evaluate('0 ^ -1')).toThrow(CalcError);
    expect(() => evaluate('-8 ^ 0,5')).toThrow(CalcError);
    expect(() => evaluate('2 ^')).toThrow('не понимаю');
  });
});

describe('ввод', () => {
  it('принимает точку и запятую, отказывает нечислу', () => {
    expect(parseNumber('1.5')).toBe(1.5);
    expect(parseNumber('1,5')).toBe(1.5);
    expect(() => parseNumber('abc')).toThrow('не число');
    expect(() => evaluate('2 +')).toThrow('не понимаю');
  });
});
