export default ({ response }: { response: any }) => {
  response.status = 404;
  response.body = "404 Page Not Found";
};
