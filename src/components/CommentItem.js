import React, { useEffect, useState, useContext } from "react";
import styles from "../CSS_modules/comments.module.css";
import { AppContext } from '../App';
import _ from 'lodash';
import imgGen from "@dudadev/random-img";


export default function CommentItem(props) {

    const { commentsList, setCommentsList } = useContext(AppContext);
    const { item } = props;
    const [onEdit, setOnEdit] = useState(true);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [visibleButtons, setVisibleButtons] = useState(false);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setComment(item.comment);
            setOnEdit(false);
        }
    }, []);

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name = 'comment') {
            setComment(e.target.value);
        }
    }

    const handleSave = () => {
        let arr = _.cloneDeep(commentsList);
        if (!item) {
            let obj;
            let sameUser = arr.find(x => x && x.name === name);
            if (sameUser) {
                obj = {
                    id: Date.now(),
                    name: name,
                    comment: comment,
                    avatar: sameUser.avatar
                }
            } else {
                obj = {
                    id: Date.now(),
                    name: name,
                    comment: comment,
                    avatar: ''
                }

                imgGen({ id: obj.id }).then((avatarURL) => {
                    obj.avatar = avatarURL;
                });
            }

                
                arr.push(obj);
                setCommentsList(arr);
                setName('');
                setComment('');
            } else {
                let editedItem = arr.find(x => x && x.id === item.id);
                if (editedItem) {
                    editedItem.name = name;
                    editedItem.comment = comment;
                    let sameUser = arr.find(x => x && x.name === name);
                    if(sameUser){
                        editedItem.avatar = sameUser.avatar;
                    }
                    setCommentsList(arr);
                    setOnEdit(false);
                }
            }
            localStorage.setItem('commentsList', JSON.stringify(arr));
        }

        const deleteItem = () => {
            let arr = _.cloneDeep(commentsList);
            let newArr = arr.filter(x => x && x.id !== item.id);
            setCommentsList(newArr);
            localStorage.setItem('commentsList', JSON.stringify(newArr));

        }

        return (
            <div className={styles.itemBlock} onMouseEnter={() => setVisibleButtons(true)} onMouseLeave={() => setVisibleButtons(false)}>
                {!onEdit ?
                    <div className={styles.imageBlock}>
                        <img src={item.avatar} />

                    </div>
                    : null}
                <div className={onEdit ? styles.infoBlockBig : styles.infoBlock}>
                    <div className={styles.nameRow}>
                        <div>
                            {onEdit ? <input value={name} type='text' name='name' placeholder="Your Name" onChange={handleChange} />
                                :
                                <div className={styles.nameDiv}>
                                    {name}
                                </div>}


                        </div>
                        <div className={styles.buttonsGroup}>
                            {item ?
                                visibleButtons ?
                                    <>
                                        <button className={styles.smallButton} onClick={() => setOnEdit(!onEdit)}>
                                            E
                                        </button>
                                        <button className={styles.smallButton} onClick={deleteItem}>
                                            X
                                        </button>
                                    </>
                                    :
                                    null
                                :
                                null}

                        </div>

                    </div>
                    <div className={styles.commentRow}>
                        {onEdit ?
                            <textarea value={comment} name='comment' placeholder="Your comment" onChange={handleChange} />
                            :
                            <div className={styles.commentDiv}>
                                {comment}
                            </div>
                        }


                    </div>
                    {onEdit ?
                        <div className="buttonRow">
                            <button disabled={!name || !comment} onClick={handleSave}>
                                {item ? 'Save' : 'Add'}

                            </button>

                        </div>
                        :
                        null}

                </div>

            </div>
        );


    }
