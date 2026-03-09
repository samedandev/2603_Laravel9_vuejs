<script setup lang="ts">
const prop = defineProps({
    modelValue: { type: String, required: true },
});

const emit = defineEmits<{
    (e: "update:modelValue", payload: string): void;
}>();

// value comes from prop
const localValue = ref(prop.modelValue);

// time to debounce a value (debouncedLocalValue) only after 500
const debouncedLocalValue = refDebounced(localValue, 500);

watch(debouncedLocalValue, () => {
    // emit an event whenever changes
    emit("update:modelValue", localValue.value);
});
</script>
<template>
    <div class="relative">
        <IconSearch
            class="w-3 w-3 absolute top-[50%] translate-y-[-50%] right-2 opacity-30"
        />

        <input
            type="text"
            placeholder="Search"
            class="pl-10 p-2 rounded"
            v-model="localValue"
        />
    </div>
</template>
