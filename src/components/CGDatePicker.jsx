import DatePicker from "tailwind-datepicker-react";

function CGDatePicker(props) {
    const { handleChange, show, handleClose } = props;
    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        datepickerClassNames: "top-12",
        language: "vi",
    };
    return (
        <DatePicker
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
        />
    );
}

export default CGDatePicker;
