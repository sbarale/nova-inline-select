export default {
    data() {
        return {
            showUpdateButton: false
        }
    },

    computed: {
        displayValue() {
            return this.field.displayUsingLabels
                ? _.find(this.field.options, { value: this.field.value }).label
                : this.field.value;
        }
    },

    methods: {
        async submit() {
            let formData = new FormData();

            formData.append(this.field.attribute, this.value);
            formData.append('_method', 'PUT');

            return Nova.request().post(`/nova-api/${this.resourceName}/${this.resourceId}`, formData)
                .then(() => {
                    let label = _.find(this.field.options, option => option.value == this.value).label;

                    this.$toasted.show(`${this.field.name} updated to "${label}"`, { type: 'success' });
                }).catch( error  => {
                    error.message = error.response.data.errors.status[0];
                    this.$toasted.show(error, { type: 'error' });
                })
                .finally(() => {
                    this.showUpdateButton = false;
                });
        }
    }
}
