
export const fetchUploadsUri = async uploads => {
  let uploadID = JSON.parse(uploads);
  let uploadUri = [];
  if (uploadID.length) {
    uploadID.map(iteration_one => {
      iteration_one.map(iteration_two => {
        uploadUri.push(JSON.parse(iteration_two.upload_path));
      });
    });
  }
  return uploadUri;
};
