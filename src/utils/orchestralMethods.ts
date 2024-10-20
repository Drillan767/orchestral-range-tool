const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function noteToMidiNumber (noteName: string): number {
    // We extract the note and its octave. Example: A#0 => [A#0, A#, 0]
    const matches = noteName.match(/^([A-G][♭#]?)(-?\d)$/)
    if (!matches) return 0
    // We get rid of 'A#0'
    const [, note, octave] = matches
    let noteIndex = notes.indexOf(note.replace('♭', '#'));
    if (noteIndex === -1) noteIndex = notes.indexOf(note[0]) - 1;
    return noteIndex + 12 * (parseInt(octave) + 1);
}