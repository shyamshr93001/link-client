import React from 'react'
import './dash.css'

const Topic = ({ topicData }) => {
    return (
        <div>
            <div className='mt-3'>
                {topicData.map((topic, index) => (
                    <div key={index} className='topic-card'>
                        <h4>{topic.name}</h4>
                        <p>Created by: {topic.createdBy}</p>
                        <p>Visibility: {topic.visibility}</p>
                        <p>Date Created: {new Date(topic.dateCreated).toUTCString()}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Topic
