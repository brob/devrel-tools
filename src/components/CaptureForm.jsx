import React, { useState } from 'react';
import { actions } from 'astro:actions';
import { v4 as uuidv4 } from 'uuid';

const CaptureForm = () => {
    const [memberActivities, setMemberActivities] = useState([{ activity: '', value: 1, impact: 1 }]);
    const [teamActivities, setTeamActivities] = useState([{ activityName: '', value: 1, reach: 1, effort: 1 }]);

    const handleMemberChange = (index, field, value) => {
        const newActivities = [...memberActivities];
        newActivities[index][field] = value;
        setMemberActivities(newActivities);
    };

    const handleTeamChange = (index, field, value) => {
        const newActivities = [...teamActivities];
        newActivities[index][field] = value;
        setTeamActivities(newActivities);
    };

    const addMemberActivity = () => {
        setMemberActivities([...memberActivities, { activity: '', value: 1, impact: 1 }]);
    };

    const addTeamActivity = () => {
        setTeamActivities([...teamActivities, { activityName: '', value: 1, reach: 1, effort: 1 }]);
    };

    const valueCaptureScore = memberActivities.reduce((acc, curr) => acc + (curr.value / curr.impact), 0);
    const valueCreation = teamActivities.reduce((acc, curr) => acc + ((curr.reach * curr.value) / curr.effort), 0);
    const creationToCaptureRatio = valueCreation / valueCaptureScore;

    const handleSave = async () => {
        const formData = {
            id: uuidv4(),
            memberActivities,
            teamActivities,
            valueCaptureScore,
            valueCreation,
            creationToCaptureRatio
        };
        console.log(JSON.stringify(formData, null, 2));

        try {
            const response = await fetch('/api/store-calculator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // on success redirect to result.id
            window.location.href =`/calculator/saved/${result.id}`
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
        

    };

    return (
        <>
            <h3 className="text-4xl text-center font-semibold my-8">Creation-to-Capture Ratio: {creationToCaptureRatio.toFixed(2)}</h3>

            <div className="p-4 grid lg:grid-cols-2 gap-x-4 gap-y-14">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Member Activities</h2>
                    {memberActivities.map((activity, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold">Activity</label>
                                    <input
                                        type="text"
                                        placeholder="Activity"
                                        value={activity.activity}
                                        onChange={(e) => handleMemberChange(index, 'activity', e.target.value)}
                                        className="block w-full text-gray-800 mb-2 p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Value</label>
                                    <select
                                        value={activity.value}
                                        onChange={(e) => handleMemberChange(index, 'value', parseInt(e.target.value))}
                                        className="block w-full text-gray-800 mb-2 p-2 border rounded"
                                    >
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Impact</label>
                                    <select
                                        value={activity.impact}
                                        onChange={(e) => handleMemberChange(index, 'impact', parseInt(e.target.value))}
                                        className="block w-full text-gray-800 mb-2 p-2 border rounded"
                                    >
                                        {[1, 2, 3].map((val) => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Ratio</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={(activity.value / activity.impact).toFixed(2)}
                                        placeholder="Value-to-Impact"
                                        className="block w-full mb-2 text-gray-800 p-2 border rounded bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addMemberActivity} className="bg-blue-500 text-white px-4 py-2 rounded">Add More</button>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Team Activities</h2>
                    {teamActivities.map((activity, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-end gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold">Activity</label>
                                    <input
                                        type="text"
                                        placeholder="Activity"
                                        value={activity.activityName}
                                        onChange={(e) => handleTeamChange(index, 'activityName', e.target.value)}
                                        className="block w-full text-gray-800 mb-2 p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Value</label>
                                    <select
                                        value={activity.value}
                                        onChange={(e) => handleTeamChange(index, 'value', parseInt(e.target.value))}
                                        className="block text-gray-800 w-full mb-2 p-2 border rounded"
                                    >
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Reach</label>
                                    <select
                                        value={activity.reach}
                                        onChange={(e) => handleTeamChange(index, 'reach', parseInt(e.target.value))}
                                        className="block text-gray-800 w-full mb-2 p-2 border rounded"
                                    >
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Effort</label>
                                    <select
                                        value={activity.effort}
                                        onChange={(e) => handleTeamChange(index, 'effort', parseInt(e.target.value))}
                                        className="block text-gray-800 w-full mb-2 p-2 border rounded"
                                    >
                                        {[1, 2, 3].map((val) => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Ratio</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={((activity.reach * activity.value) / activity.effort).toFixed(2)}
                                        placeholder="Value-to-Effort"
                                        className="block w-full text-gray-800 mb-2 p-2 border rounded bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addTeamActivity} className="bg-blue-500 text-white px-4 py-2 rounded">Add More</button>
                </div>
            </div>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Save</button>
        </>
    );
};

export default CaptureForm;