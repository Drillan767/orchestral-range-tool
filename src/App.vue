<script setup lang="ts">
import { ref, computed } from 'vue'
import { noteToMidiNumber } from './utils/orchestralMethods'
import Piano from './components/Piano.vue'
import Results from './components/Results.vue'

type Preset = 'unison' | 'solo' | 'low'

const preset = ref<Preset>('unison')

const selectedNotes = ref<string[]>([])

const sortedSelectedNotes = computed(() => {
    // Notes are ordered by midi value.
    return [...selectedNotes.value].sort((a, b) => noteToMidiNumber(a) - noteToMidiNumber(b))
})

</script>

<template>
    <h1 class="text-5xl font-bold text-cyan-700 text-center mt-5">
        ORCHESTRATION RANGE TOOL
    </h1>

    <div class="text-center my-8">
        <p>
            Based on the work of Rovshan in <a target="_blank" class="text-cyan-700" href="https://asgarzademusicschool.com/">Secrets of Orchestration</a>. 
        </p>

        <p>
            Choose the lowest and highest notes of your melody, and if you want a solo line or unison/octave doublings. <br />
            The tool will suggest appropriate instruments for that range.
        </p>
        <p>
            Middle is C4.
        </p>
    </div>

    <div class="flex flex-col items-center">
        <div id="select" class="text-center mb-4">
            <label>
                <input type="radio" value="unison" v-model="preset" />
                Unison and Octave Doubling
            </label>
            <label>
                <input type="radio" value="solo" v-model="preset" />
                Solo Writing
            </label>
            <label>
                <input type="radio" value="low" v-model="preset" />
                Low and Very Low Registers
            </label>
        </div>

        <Piano v-model="selectedNotes" />
        <p>
            Selected notes: {{ sortedSelectedNotes.length > 0 ? sortedSelectedNotes.join(', ') : 'None selected' }}.
        </p>
    </div>

    <Results
        v-if="sortedSelectedNotes.length === 2"
        :notes="sortedSelectedNotes"
        :preset
    />

</template>
