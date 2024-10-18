<script setup lang="ts">
import { ref } from 'vue'
import PianoKeys from '../assets/pianoKeys.json'

type Preset = 'unison' | 'solo' | 'low'

const labels = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']

defineEmits<{
    (e: 'update:note', value: string): void
    (e: 'update:preset', value: Preset): void
}>()

const preset = ref<Preset>('unison')
const notes = ref<string[]>([])

</script>

<template>
    {{ notes }}
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
    <div id="piano">
        <label
            v-for="(key, i) in PianoKeys"
            :key="i"
            :class="{ [key.type]: true, 'active': notes.includes(key.note) }"
        >
            <input
                v-model="notes"
                :value="key.note"
                type="checkbox"
            />

            <span>
                {{ labels.includes(key.note) ? key.note : '' }}
            </span>
        </label>
    </div>
</template>

<style lang="css" scoped>
#piano {
    height: 20em;
    border-radius: 1em;
    position: relative;
}

#piano label {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    float: left;
    text-align: center;
}

#piano label:first-child {
    border-radius: 5px 0 5px 5px;
}

#piano label:last-child {
    border-radius: 0 5px 5px 5px;
}

#piano input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

#piano label.white {
    height: 10em;
    width: 1.8em;
    z-index: 1;
    border-radius: 0 0 5px 5px;
}

#piano label.white.active {
    border-top: 1px solid #777;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
    box-shadow: 2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background: linear-gradient(to bottom,#fff 0%,#e9e9e9 100%)
}

#piano label.white:not(.active) {
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    box-shadow: -1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background: linear-gradient(to bottom,#eee 0%,#fff 100%)
}

#piano label.black {
    height: 5em;
    width: 1em;
    margin: 0 0 0 -1em;
    z-index: 2;
    left: 8px;
    border: 1px solid #000;
    border-radius: 0 0 3px 3px;
}

#piano label.black.active {
    box-shadow: -1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
    background: linear-gradient(to right,#444 0%,#222 100%);
}

#piano label.black:not(.active) {
    box-shadow: -1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background: linear-gradient(45deg,#222 0%,#555 100%);
}

#piano label span {
    position: absolute;
    bottom: 5px;
    left: 7px;
    color: #888;
    font-size: 10px;
}
</style>