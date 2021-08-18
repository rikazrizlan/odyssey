import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Delete, Done} from '@material-ui/icons';
import LearningGuy from '../images/learningguy.png';
import '../App.css';

function BucketList() {
    const [listItems, setListItems] = useState([]);
    const [index, setIndex] = useState(0);
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection('bucketList').orderBy('timeStamp', 'asc').onSnapshot(snapshot => {
            setListItems(snapshot.docs.map(doc => ({
              id: doc?.id,
              listItem: doc?.data()
            })));
          })
    }, []);

    const userBucketList = listItems?.filter((item) => item?.listItem.username === currentUser?.displayName);

    return (
        <div className="bucket-list-container">
            <ul className="bucket-list">
                {
                    userBucketList &&
                    userBucketList?.map((item, id) => (
                        <div className="list-item" key={id}>
                            <li className={index === id ?"list-completed":""}>{item?.listItem?.bucketItem}</li>
                            <Done onClick={() => setIndex(id)} className="done-btn" />
                            <Delete  style={{color: "white", background: "rgb(163, 48, 48)", borderRadius: 3}} />
                        </div>
                    ))
                }
            </ul>
            <img src={LearningGuy} alt="Man vector" />
        </div>
    )
}

export default BucketList