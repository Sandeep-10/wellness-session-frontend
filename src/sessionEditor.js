import { Component } from "react";
import Cookies from 'js-cookie';
import './sessioneditor.css';
import { v4 as uuidv4 } from 'uuid';
import Header from './header';  
import {
    SpinnerLoader,
  } from '@akshay-bhalala/loaders';

class SessionEditor extends Component {
    state = {
        title: '',
        status: 'draft', 
        json_file_url: '',
        tags: '',
        error: '',
        publish: false,
        result: '',
        displayResult: false,
        isLoading: false,
        titleError: false,
        json_file_urlError: false,
        tagsError: false
        }

    onChangePublish = () => {
        this.setState({publish: !this.state.publish});
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    }

    onChangeStatus = (e) => {
        this.setState({status: e.target.value});
    }

    onChangeJSONUrl = (e) => {  
        this.setState({json_file_url: e.target.value});
    }

    onChangeTags = (e) =>{
        this.setState({tags: e.target.value})       
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {title, status, json_file_url, tags,publish} = this.state;
        const sessionData = {
            id: uuidv4(),
            title,
            status,
            json_file_url,
            tags
        };
        if(title === '' || json_file_url === '' || tags === ''){
            this.setState({titleError: true, json_file_urlError: true, tagsError: true});
            return;
        }else if(title === ''){
            this.setState({titleError: true});
            return;
        }else if(json_file_url === ''){
            this.setState({json_file_urlError: true});
            return;
        }else if(tags === ''){
            this.setState({tagsError: true});
            return;
        }
        
        console.log(sessionData);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(sessionData)
        }
        const response = await fetch('http://localhost:5000/my-sessions/save-draft', options);
        const data = await response.json();
        if(response.ok){
            this.setState({result: data.message, displayResult: true,isLoading: false,error: ''});
        }else{
            this.setState({error: data.error,result: '',displayResult: false});
            return;
        }
        console.log(data);
        if(publish===true){
            console.log('publishing');
            const publishData = {
                session_id: sessionData.id
            }
            const publishOptions = {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('jwt_token')}`
                },
                body: JSON.stringify(publishData)
            }
            const publishResponse = await fetch('http://localhost:5000/my-sessions/publish', publishOptions);
            const publishDataResult = await publishResponse.json();
            
            console.log(publishDataResult);
            if(publishResponse.ok){ 
                this.setState({result: publishDataResult.message, displayResult: true,isLoading: false});
            }else{
                this.setState({error: publishDataResult.error});
                this.setState({publish: false});
                return;
            }   
        }
    }

    render() {
        const {title, json_file_url, error,tags,result,displayResult,isLoading,titleError,json_file_urlError,tagsError} = this.state;
        return (
            isLoading ? (
                <div className="loader-container">
                    <SpinnerLoader color="#000000" height={80} width={80} />
                </div>
            ) : (
            <div className="session-editor-container">
                <Header />
                <div className="editor-card">
                    <div className="editor-header">
                        <h1 className="editor-title">Create Wellness Session</h1>
                        <p className="editor-subtitle">Design and publish your wellness session</p>
                    </div>
                    
                    <form onSubmit={this.handleSubmit} className="editor-form">
                        <div className="form-section">
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    placeholder="Enter session title (e.g., Morning Meditation, Yoga Flow)" 
                                    onChange={this.onChangeTitle} 
                                    value={title}
                                    className="form-input"
                                />
                                {titleError && <div className="error-message">Title is required</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="JSONUrl" className="form-label">JSON File URL</label>
                                <input 
                                    type="text" 
                                    id="JSONUrl" 
                                    placeholder="Enter JSON file URL for session content" 
                                    onChange={this.onChangeJSONUrl} 
                                    value={json_file_url}
                                    className="form-input"
                                />
                                {json_file_urlError && <div className="error-message">JSON File URL is required</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="tags" className="form-label">Tags</label>
                                <input 
                                    type="text" 
                                    id="tags" 
                                    placeholder="Enter tags separated by commas (e.g., meditation, wellness)" 
                                    onChange={this.onChangeTags} 
                                    value={tags}
                                    className="form-input"
                                />
                                {tagsError && <div className="error-message">Tags are required</div>}
                            </div>
                        </div>

                        <div className="status-section">
                            <h3 className="status-title">Session Status</h3>
                            <div className="status-options">
                                <div className="status-option">
                                    <input 
                                        type="checkbox" 
                                        id="statusdraft" 
                                        name="status"
                                        value="draft"
                                        onChange={this.onChangeStatus}
                                    />
                                    <label htmlFor="statusdraft">Draft</label>
                                </div>
                                <div className="status-option">
                                    <input 
                                        type="checkbox" 
                                        id="statuspublished" 
                                        name="status"
                                        value="published"
                                        onChange={this.onChangeStatus}
                                    />
                                    <label htmlFor="statuspublished">Published</label>
                                </div>
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        {displayResult && <div className="result-container">
                            <div className="result-message">{result}</div>
                        </div>}
                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="action-btn btn-save"
                            >
                                Save
                            </button>
                            <button 
                                type="submit" 
                                className="action-btn btn-publish"
                                onClick={() => this.setState({ publish: true })}
                            >
                            Publish                                
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )
        );
    }
}   
export default SessionEditor;