<script setup lang="ts">
import { computed } from 'vue'
import { noteToMidiNumber } from '../utils/orchestralMethods'
import allInstruments from '../assets/instruments.json'


interface Props {
    notes: string[]
    preset: 'unison' | 'solo' | 'low'
}

interface Instrument {
    name: string
    range: {
        high: string
        low: string
    }
    color: string
    section: string
}

interface InstrumentResult {
    title: string
    categories: {
        title: string
        instruments: {
            name: string
            color: string
        }[]
    }[]
}

const transpositions = [
    { label: 'Original Range', offset: 0 },
    { label: 'One octave lower', offset: -12 },
    { label: 'Two octaves lower', offset: -24 },
    { label: 'One octave higher', offset: 12 },
    { label: 'Two octaves higher', offset: 24 }
]

const props = defineProps<Props>()

const lowNote = computed(() => {
    if (props.notes.length === 0) return 0
    return noteToMidiNumber(props.notes[0])
})

const highNote = computed(() => {
    if (props.notes.length <= 1) return 0
    return noteToMidiNumber(props.notes[1])
})

const relatedInstrumentsList = computed<Instrument[]>(() => allInstruments[props.preset])

function isInRange(note: number, instrumentRange: Instrument['range']) {
  const lowMidi = noteToMidiNumber(instrumentRange.low);
  const highMidi = noteToMidiNumber(instrumentRange.high);
  return note >= lowMidi && note <= highMidi;
}

const instrumentsResults = computed<InstrumentResult[]>(() => {
    return transpositions.map(({ label, offset }): InstrumentResult => {
        const transposedLow = lowNote.value + offset;
        const transposedHigh = highNote.value + offset;

        // Retrieving the list of all instruments matching the range picked by the user.
        const suitableInstruments = relatedInstrumentsList.value.filter((instrument) => 
            isInRange(transposedLow, instrument.range) && isInRange(transposedHigh, instrument.range)
        );

        // Building an array of objects for each category, with the related instruments grouped by section.
        const categories = ['🪈 Woodwinds', '🎺 Brass', '🎻 Strings']
            .map(section => ({
                title: section,
                instruments: suitableInstruments
                    .filter(instr => instr.section === section)
                    .map(({ name, color }) => ({ name, color }))
            }))
            // Removing empty categories so that the title doesn't get display for nothing.
            .filter(category => category.instruments.length > 0);

        return { 
            title: label,
            categories,
         };
    })
    // Filtering again to make extra sure nothing empty gets left behind.
    .filter(result => result.categories.length > 0);
})

</script>

<template>
    <p v-if="instrumentsResults.length === 0">
        No suitable stuff found.
    </p>

    <div v-else class="container mx-auto">
        <section
            v-for="(result, i) in instrumentsResults"
            :key="i"
        >
            <h2 class="text-4xl mb-4">
                {{ result.title }}
            </h2>


            <div class="grid grid-cols-3">
                <div
                    v-for="(category, j) in result.categories"
                    :key="j"
                >
                    <h3 class="text-3xl mb-4">
                        {{ category.title }}
                    </h3>
                    <ul class="list-disc list-inside">
                        <li
                            v-for="(instrument, k) in category.instruments"
                            :key="k"
                            :class="instrument.color"
                        >
                            {{ instrument.name }}
                        </li>
                    </ul>
                </div>
            </div>
            
        </section>

        <div class="mt-4">
            <div class="flex">
                <div class="h-5 w-5 bg-red-500 mr-2" />
                <span>Red: Hot timbre</span>
            </div>

            <div class="flex">
                <div class="h-5 w-5 bg-purple-500 mr-2" />
                <span>Purple: Warm timbre</span>
            </div>

            <div class="flex">
                <div class="h-5 w-5 bg-blue-500 mr-2" />
                <span>Blue: Cold timbre</span>
            </div>
        </div>
    </div>


</template>

<style lang="css" scoped>
h2, h3 {
    @apply font-bold text-cyan-700;
}

.blue {
    @apply text-blue-500;
}

.purple {
    @apply text-purple-500;
}

.red {
    @apply text-red-500;
}
</style>