import moment from "moment";

const Resource = ({ userResourceData, Title = "My Resources" }) => {
  return (
    <>
      {userResourceData.length > 0 && (
        <div>
          <h2 className="mt-3">{Title}</h2>
          {userResourceData.map((resource, index) => (
            <div key={index} className="topic-card">
              <h4>Topic : {resource.topic.name}</h4>
              <div>Description : {resource?.description}</div>
              <div className="fs-6 text-muted">
                Topic by : {resource.topic.createdBy}
              </div>
              <div className="fs-6 text-muted">
                Resource created By : {resource?.createdBy}
              </div>
              <div className="fs-6 text-muted text-left">
                Date Created:{" "}
                {moment(resource.dateCreated).format("DD/MM/YY, h:mm a")}
              </div>
              {resource?.url && (
                <a
                  href={resource?.url}
                  target="_blank"
                  className="d-block"
                  rel="noopener noreferrer"
                >
                  Url : {resource?.url}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Resource;
