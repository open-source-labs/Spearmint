export interface PtyArgs {
  name: string;
  cols: number;
  rows: number;
  cwd: string;
  env: Object;
}
