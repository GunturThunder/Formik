import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import ErrorMsg from './ErrorMsg'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumber: ["", ""],
    phNumbers: ['']
}

const onSubmit = values => {
    console.log('Form Data ', values)
}


const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    channel: Yup.string().required('Required'),
    comments: Yup.string().required('Required'),
    address: Yup.string().required('Required'),

})

function YoutubeFrom() {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name" component={ErrorMsg} />
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" >
                        {
                            (errormgProps) => <div className="errors">{errormgProps}</div>
                        }
                    </ErrorMessage>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field type="text" id="channel" name="channel" />
                    <ErrorMessage name="channel" component={ErrorMsg} />
                </div>

                <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field as="textarea" id="comments" name="comments" />
                    <ErrorMessage name="comments" component={ErrorMsg} />
                </div>

                <div className="form-control" >
                    <label htmlFor="address">Address</label>
                    <Field name="address">
                        {
                            (props) => {
                                const { field, meta } = props
                                return (
                                    <div>
                                        <input type="text" id="address" {...field} />
                                        {meta.touched && meta.error ? <div className="errors">{meta.error}</div> : null}
                                    </div>
                                )
                            }
                        }
                    </Field>
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook</label>
                    <Field type="text" id="facebook" name="social.facebook" />
                </div>

                <div className="form-control">
                    <label htmlFor="twitter">Twitter</label>
                    <Field type="text" id="twitter" name="social.twitter" />
                </div>

                <div className="form-control">
                    <label htmlFor="primaryPh">Primary Phone Number</label>
                    <Field type="number" id="primaryPh" name="phoneNumber[0]" />
                </div>

                <div className="form-control">
                    <label htmlFor="secondaryPh">Secondary Phone Number</label>
                    <Field type="number" id="secondaryPh" name="phoneNumber[1]" />
                </div>

                <div className="form-control">
                    <label>List Of Phone Number</label>
                    <FieldArray name="phNumbers">
                        {
                            (props) => {
                                const { push, remove, form } = props
                                const { values } = form
                                const { phNumbers } = values
                                return (
                                    <div>
                                        {
                                            phNumbers.map((phNumber, index) => (
                                                <div key={index}>
                                                    <Field type="number" name={`phNumbers[${index}]`} />
                                                    {index > 0 &&
                                                        <button type="button" onClick={() => remove(index)}>-</button>
                                                    }
                                                    <button type="button" onClick={() => push('')}>+</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        }
                    </FieldArray>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}
export default YoutubeFrom