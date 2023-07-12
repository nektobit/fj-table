import {Input} from "@angular/core";

function filter(value: number, suffix: string): string{
  return value.toString() + suffix;
}

export const defaultNumberOptions: NumberOptions = {
  colSuffix: '',
  filter: (value, suffix='') => value.toString() + suffix,
}

export interface FjTableOptions{
  nestedHeaders?: any | undefined;
  colHeaders?: any | undefined;
  nestedRows?: boolean | undefined;

  numberOptions: NumberOptions;
}

export interface NumberOptions{
  filter: (value: number, suffix: string) => string;
  colSuffix: any | undefined;
}
