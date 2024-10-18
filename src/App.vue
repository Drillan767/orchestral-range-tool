<script setup lang="ts">
import Piano from './components/Piano.vue'
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
        <Piano />
    </div>

</template>
