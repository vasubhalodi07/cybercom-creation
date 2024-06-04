<template>
    <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900 pl-4 pr-4 pt-4">{{ title }}</h3>
        <form @submit.prevent="handleSubmit">
            <div class="p-4">
                <div v-for="(field, index) in fields" :key="index" class="mb-4">
                    <label :for="field.name" class="block text-sm mb-1 font-medium text-gray-700">{{ field.label }}</label>
                    <input v-if="field.type === 'text'" :type="field.type" :name="field.name"
                        v-model="formData[field.name]" :placeholder="field.placeholder"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <textarea v-else-if="field.type === 'textarea'" :name="field.name" v-model="formData[field.name]"
                        :placeholder="field.placeholder"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" :disabled="loading"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    :style="{ cursor: loading ? 'not-allowed' : 'pointer' }">
                    {{ loading ? "Loading..." : "Submit" }}
                </button>
                <button type="button" @click="handleCancel" :disabled="loading"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    :style="{ cursor: loading ? 'not-allowed' : 'pointer' }">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        fields: {
            type: Array,
            required: true,
        },
        initialData: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            formData: { ...this.initialData },
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('submit', this.formData);
        },
        handleCancel() {
            this.$emit('cancel');
        },
    },
};
</script>

<style scoped></style>