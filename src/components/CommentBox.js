import React from 'react';
import { connect } from 'react-redux';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import {commentPost , deleteComment} from '../actions/post';
import { message } from 'antd';
import DeleteIcon from '@material-ui/icons/Delete';


const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    style={{width:'80%', margin:'auto'}}
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const error = (msg) => {
 
   message.error(`${msg}`);
  
};


 class CommentBox extends React.Component {
  constructor(props) {
  super(props);

  const list = []
  props.data.map((item, index)=>{

    var user_name = item.creator.name
    var user_message = item.message ? item.message : 'no comments'
    var creation_time = moment(item.createdAt).fromNow();
    list.push({
      
        author: user_name,
        avatar: item.creator.avatar,
        content: <p>{user_message}</p>,
        datetime: <div> 
                        {creation_time}&nbsp; &nbsp; 
                          {
                            props.user === item.creator._id  ? <DeleteIcon 
                            fontSize="small" 
                            onClick={()=>this.handleDeleteComment(item._id, index)}
                            style={{cursor:'pointer', color:'red'}}
                          /> : null
                          }
                        
                  </div>,
    
    })

    return 1
  })
  this.state = {
    comments: list,
    submitting: false,
    value: '',
    user : JSON.parse(localStorage.getItem('profile'))
  }
};


handleDeleteComment = (id, index) =>{
  const response = this.props.deleteComment(id)
}

  handleSubmit = () => {
    if (!this.state.value || !this.props.user) {
      if(!this.state.value) error('Please write something')
      if(!this.props.user) error('Please login first')
      
      return ;
    }
    const message = this.state.value
    this.props.commentPost(message, this.props.postId);

    
    this.setState({
      submitting: true,
    });

   
    setTimeout(() => {
      const name = this.state.user ? this.state.user.result.name : ' ';
     
      this.setState({
        submitting: false,
        value: '',

        comments: [
          ...this.state.comments,
          {
            author: name,
            avatar: this.state.user.result.avatar,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          style={{width:'80%', margin:'auto'}}
          avatar={
            <Avatar
              src={ this.state.user ? this.state.user.result.avatar : null}
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    commentPost: (value, id) => dispatch(commentPost(value, id)),
    deleteComment: (id) => dispatch(deleteComment(id))
  }
  
}
export default connect(null, mapDispatchToProps)(CommentBox);