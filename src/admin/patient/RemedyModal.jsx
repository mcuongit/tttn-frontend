import {
    Button,
    FileInput,
    Label,
    Modal,
    Spinner,
    TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { getBase64 } from "../../utils/functions";
import { finishBooking } from "../../api/bookingService";

function RemedyModal(props) {
    const { handleModal, showModal, dataModal, filterData } = props;

    function FormToSend(props) {
        const { data } = props;
        const [email, setEmail] = useState(data.email);
        const [file, setFile] = useState(null);
        const [loading, setLoading] = useState(false);
        const handleFileChange = (e) => {
            const { files } = e.target;
            const data = files[0];
            getBase64(data).then((result) => {
                setFile(result);
            });
        };
        const handleEmailChange = (e) => {
            const { value } = e.target;
            setEmail(value);
        };
        const handleSubmit = () => {
            const { doctorId, patientId, timeType, id, fullName } = dataModal;
            const formData = {
                file,
                email,
                doctorId,
                patientId,
                timeType,
                fullName,
            };
            setLoading(true);
            finishBooking(formData)
                .then((res) => {
                    if (res.data && res.data.statusCode == 0) {
                        setLoading(false);
                        handleModal();
                        filterData(id);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setLoading(false);
                });
        };
        return (
            <>
                <div className="space-y-6">
                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="mb-2">
                                <Label value="Email bệnh nhân" />
                            </div>
                            <TextInput
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => handleEmailChange(e)}
                            />
                        </div>
                        <div>
                            <div className="mb-2">
                                <Label value="File hóa đơn" />
                            </div>
                            <FileInput
                                id="file"
                                helperText="Chọn file hóa đơn từ hệ thống"
                                name="bill"
                                onChange={(e) => handleFileChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-2 mt-5 pt-5 border-t">
                    {loading ? (
                        <Button onClick={handleSubmit} disabled>
                            <Spinner size={"sm"} />
                            <span className="pl-3">Xin chờ...</span>
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>Xác nhận</Button>
                    )}

                    <Button color="gray" onClick={handleModal}>
                        Đóng
                    </Button>
                </div>
            </>
        );
    }
    return (
        <React.Fragment>
            <Modal show={showModal} onClose={handleModal}>
                <Modal.Header>Gửi hóa đơn khám bệnh</Modal.Header>
                <Modal.Body>
                    <FormToSend data={dataModal} handleSubmit />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default RemedyModal;
