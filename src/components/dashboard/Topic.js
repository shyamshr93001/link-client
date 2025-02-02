import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './dash.css'


const Topic = ({topicHeading, topicData, isUser = false }) => {

    return (
        <>
            <div>
                <h2 className='mt-2'>{topicHeading}</h2>
                <div className='mt-3'>
                    {topicData.toReversed().map((topic, index) => (
                        <div key={index} className='topic-card'>
                            <h4>{topic.name}</h4>
                           {!isUser && <p>Created by: {topic.createdBy}</p> }
                           {isUser && <p>Visibility: {topic.visibility}</p>}
                            <p>Date Created: {new Date(topic.dateCreated).toLocaleString(undefined, {hour12: true, timeZone: 'Asia/Kolkata'})}</p>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}

export default Topic
