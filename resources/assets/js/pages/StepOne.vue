<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card card-body no-card-border">
                <h4 class="card-title">Company Information</h4>
                <h5 class="card-subtitle"> please fill below form for your company info </h5>
                <form class="form-horizontal m-t-30">
                    <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" class="form-control" placeholder="Constellation">
                    </div>
                    <div class="form-group">
                        <label for="ft_threshold">Full Time Threshold</label>
                        <input type="number" id="ft_threshold" class="form-control" value="58">
                    </div>
                    <div class="form-group m-b-30">
                        <label class="mr-sm-2" for="review_period">Review Period</label>
                        <select class="custom-select mr-sm-2" id="review_period">
                            <option value="1" selected>Weekly</option>
                            <option value="2" selected>Bi Weekly</option>
                            <option value="3" selected>Monthly</option>
                            <option value="4" selected>Bi Monthly</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email} from 'vuelidate/lib/validators'

    export default {
        props: ['clickedNext', 'currentStep'],
        mixins: [validationMixin],
        data() {
            return {
                form: {
                    username: '',
                    demoEmail: '',
                    message: ''
                }
            }
        },
        validations: {
            form: {
                username: {
                    required
                },
                demoEmail: {
                    required,
                    email
                },
                message: {
                    required
                }
            }
        },
        watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid) {
                        this.$emit('can-continue', {value: true});
                    } else {
                        this.$emit('can-continue', {value: false});
                    }
                },
                deep: true
            },
            clickedNext(val) {
                if(val === true) {
                    this.$v.form.$touch();
                }
            }
        },
        mounted() {
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
    }
</script>