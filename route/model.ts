type UpdateStatusRequestData = {
    personalID: number;
    status: number;
};

type UpdateStatusRequest = {
    data: UpdateStatusRequestData[];
    numOfRecords: number;
};

export { UpdateStatusRequest, UpdateStatusRequestData };