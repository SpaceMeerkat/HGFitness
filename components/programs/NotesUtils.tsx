export const ALTERNATIVE_TRIGGER_PREFIX = 'AlternativeTrigger:';
const ALTERNATIVE_TRIGGER_SEPARATOR = ' was swapped for ';

export const buildAlternativeTriggerNote = (originalExercise: string, alternativeExercise: string): string =>
  `${ALTERNATIVE_TRIGGER_PREFIX} ${originalExercise}${ALTERNATIVE_TRIGGER_SEPARATOR}${alternativeExercise}`;

export const isAlternativeTriggerNote = (note: string): boolean =>
  typeof note === 'string' && note.startsWith(ALTERNATIVE_TRIGGER_PREFIX);

// Splits a trigger note back into its original/alternative exercise names so the
// UI can render them in a different colour to the surrounding "was swapped for" text.
export const parseAlternativeTriggerNote = (note: string): { original: string; alternative: string } | null => {
  if (!isAlternativeTriggerNote(note)) return null;
  const body = note.slice(ALTERNATIVE_TRIGGER_PREFIX.length).trim();
  const separatorIndex = body.indexOf(ALTERNATIVE_TRIGGER_SEPARATOR);
  if (separatorIndex === -1) return null;
  return {
    original: body.slice(0, separatorIndex).trim(),
    alternative: body.slice(separatorIndex + ALTERNATIVE_TRIGGER_SEPARATOR.length).trim(),
  };
};

// Older saved sessions stored userNotes as a single string rather than a list.
export const normalizeNotes = (value: any): string[] => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value !== '') return [value];
  return [];
};

export const splitNotes = (value: any): { triggerNotes: string[]; freeTextNote: string } => {
  const notes = normalizeNotes(value);
  const triggerNotes = notes.filter(isAlternativeTriggerNote);
  const freeTextNote = notes.find(note => !isAlternativeTriggerNote(note)) || '';
  return { triggerNotes, freeTextNote };
};

export const formatTriggerNoteForDisplay = (note: string): string =>
  note.startsWith(ALTERNATIVE_TRIGGER_PREFIX) ? note.slice(ALTERNATIVE_TRIGGER_PREFIX.length).trim() : note;
