
const Resource = ({userResourceData, Title="My Resources"}) => {
 
  return (
    <>
    {userResourceData.length > 0 && <div>
      <h2 className="mt-3">{Title}</h2>
      {userResourceData.map((resource, index) => (
        <div key={index} className="topic-card">
          <h4>Topic : {resource.topic.name}</h4>
          <div>Description : {resource?.description}</div>
          <div>Topic by : {resource.topic.createdBy}</div>
          <div>Resource created By : {resource?.createdBy}</div>
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
    </div>}
    </>
  );
};

export default Resource;
