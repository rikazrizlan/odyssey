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
        db.collection('bucketList').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {
            setListItems(snapshot.docs.map(doc => ({
              id: doc?.id,
              listItem: doc?.data()
            })));
          })
    }, []);

    const userBucketList = listItems?.filter((item) => item?.listItem.username === currentUser?.displayName);

    const deleteItem = async(e) => {
        const res = await db.collection('bucketList').doc(`cSAdHbs6vLK1wCqGPo7d`).delete();
        console.log(e.id);
        console.log(res);
    }

    return (
        <div className="bucket-list-container">
            <ul className="bucket-list">
                {
                    userBucketList &&
                    userBucketList?.map((item, id) => (
                        <div className="list-item" key={id}>
                            <li className={index === id ?"list-completed":""}>{item?.listItem?.bucketItem}</li>
                            <Done onClick={() => setIndex(id)} className="done-btn" />
                            <Delete onClick={() => deleteItem(item.id)}  style={{color: "white", background: "rgb(163, 48, 48)", borderRadius: 3}} data-id={`${id}`} />
                        </div>
                    ))
                }
            </ul>
            <img src={LearningGuy} alt="Man vector" />
        </div>
    )
}

export default BucketList