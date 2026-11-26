// One Line of Earned Pride — competition entry.
//
// The entry is a single line about a pride that was paid for in years:
// a night-shift cleaner who, after eleven years of mopping the bakery,
// is finally trusted with its keys — and uses that trust to open early
// for the kids on the street. This program simply delivers that line,
// unchanged, to entry.txt in the chosen output directory.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry itself. The competition allows between 1 and 240 characters.
const ENTRY_LINE =
  "After eleven years mopping it on night shifts, Maria finally held the bakery's keys — and opened an hour early for the street kids.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 240;

// Refuse to ship a line that breaks the competition's size limits.
function assertLineFits(line: string): void {
  if (line.length < MIN_LENGTH) {
    throw new Error('entry line is empty; nothing to submit');
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(
      `entry line is ${line.length} characters; the limit is ${MAX_LENGTH}`,
    );
  }
}

// The runner sets MAKEFUN_OUTPUT_DIR; fall back to /output for local runs.
function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== '' ? fromEnv : '/output';
}

function main(): void {
  assertLineFits(ENTRY_LINE);

  const dir = outputDirectory();
  mkdirSync(dir, { recursive: true });

  // Exactly the line, one trailing newline, UTF-8 — same bytes every run.
  const target = join(dir, 'entry.txt');
  writeFileSync(target, ENTRY_LINE + '\n', 'utf8');

  // Echo what was delivered so the run log proves it without opening the file.
  console.log(`entry written to ${target}:`);
  console.log(ENTRY_LINE);
}

main();
