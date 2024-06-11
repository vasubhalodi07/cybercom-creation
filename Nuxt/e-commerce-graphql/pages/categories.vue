<template>
    <div class="pt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-4">
            <div class="text-2xl font-bold">Categories</div>
            <button @click="openAddModel"
                class="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Add
                Category</button>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b-2 border-gray-300">ID</th>
                        <th class="py-2 px-4 border-b-2 border-gray-300">Name</th>
                        <th class="py-2 px-4 border-b-2 border-gray-300">Image</th>
                        <th class="py-2 px-4 border-b-2 border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(category, index) in categories" :key="category.id">
                        <td class="py-2 px-4 border-b border-gray-300 text-center">{{ index + 1 }}</td>
                        <td class="py-2 px-4 border-b border-gray-300 text-center">{{ category.name }}</td>
                        <td class="py-2 px-4 border-b border-gray-300 text-center">
                            <div class="flex justify-center items-center">
                                <img :src="category.image" class="h-12 w-12 object-cover" />
                            </div>
                        </td>
                        <td class="py-2 px-4 border-b border-gray-300 text-center">
                            <div class="flex justify-center items-center gap-1">
                                <svg @click="openDeleteModal(category.id)" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                                    class="size-6 pointer" style="cursor: pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <svg @click="openEditModal(category)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6"
                                    style="cursor: pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Modal v-if="visible">
            <template v-if="modalState == 'add'">
                <DynamicForm :title="'Add Category'" :loading="loading" :fields="currentFields"
                    @submit="handleAddCategory" @cancel="handleCancel" />
            </template>
            <template v-if="modalState == 'edit'">
                <DynamicForm :title="'Edit Category'" :loading="loading" :fields="currentFields"
                    :initialData="currentData" @submit="handleEditCategory" @cancel="handleCancel" />
            </template>
            <template v-if="modalState == 'delete'">
                <DeleteConfirmation :loading="loading" header="category" @submit="handleDelete"
                    @cancel="handleCancel" />
            </template>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            visible: false,
            modalState: "",
            currentCategoryId: null,
            currentFields: [],
            currentData: {},
        };
    },
    computed: {
        ...mapState('category', {
            categories: state => state.categories,
            loading: state => state.loading,
        })
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        ...mapActions('category', ['fetchCategories', 'createCategory', 'updateCategory', 'deleteCategory']),

        openAddModel() {
            this.currentFields = this.categoryFields();
            this.modalState = "add";
            this.visible = true;
        },

        categoryFields() {
            return [
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter category name' },
                { name: 'image', label: 'Image URL', type: 'text', placeholder: 'Enter category image URL' },
            ];
        },

        openEditModal(category) {
            this.currentFields = this.categoryFields();
            this.currentData = {
                name: category.name,
                image: category.image,
            }
            this.currentCategoryId = category.id;
            this.modalState = "edit";
            this.visible = true;
        },

        openDeleteModal(id) {
            this.currentCategoryId = id;
            this.visible = true;
            this.modalState = "delete";
        },

        handleAddCategory(formData) {
            this.createCategory({ name: formData.name, image: formData.image });
            this.handleCancel();
            this.fetchCategories();
        },

        handleEditCategory(formData) {
            this.updateCategory({ id: this.currentCategoryId, name: formData.name, image: formData.image });
            this.fetchCategories();
        },

        handleDelete() {
            this.deleteCategory(this.currentCategoryId);
            this.handleCancel();
            this.fetchCategories();
        },

        handleCancel() {
            this.visible = false;
            this.modalState = "";
            this.currentCategoryId = null;
        },
    },
};
</script>

<style scoped></style>
