import { useState } from "react";
import "./styles/login.css"
import { Form, Button, Checkbox, DatePicker, Input, Select, Modal, Space, Typography } from "antd";



function LandingPage() {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Click to Register
            </Button>
            <Modal
                title="Registration Form"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                styles={{ maxHeight: 300 }}
            >
                <RegistrationForm />
            </Modal>

        </div>
    )
};

function RegistrationForm() {
    const [formArray, setFormArray] = useState([]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setgender] = useState("");


    const onFinish = (values) => {
        const keys = Object.keys(values);
        // const newValues = {
        //     [keys[0]]: { [keys[0]]: values[keys[0]] },
        // };
        console.log('My name is ', values[keys[0]]);
        const updatedArray = {fullName: values[keys[0]]}
        setFormArray([...formArray, updatedArray]);
        console.log(formArray);
    }

    return (
        <div className="App">
            <header className="App-header">
                <Form

                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name",
                            },
                            { whitespace: true },
                            { min: 3 },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Type your name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Type your email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                            },
                            { min: 6 },
                            {
                                validator: (_, value) =>
                                    value && value.includes("A")
                                        ? Promise.resolve()
                                        : Promise.reject("Password does not match criteria."),
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Type your password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "The two passwords that you entered does not match."
                                    );
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" requiredMark="optional">
                        <Select placeholder="Select your gender">
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: "Please provide your date of birth",
                            },
                        ]}
                        hasFeedback
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            picker="date"
                            placeholder="Chose date of birth"
                        />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        wrapperCol={{ span: 24 }}
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                            "To proceed, you need to agree with our terms and conditions"
                                        ),
                            },
                        ]}
                    >
                        <Checkbox>
                            {" "}
                            Agree to our <a href="#">Terms and Conditions</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button block type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </header>
        </div>

    )
}

export default LandingPage;
