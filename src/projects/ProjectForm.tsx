import React, { SyntheticEvent, useState } from 'react'
import { Project } from './Project';

interface ProjectFormProps{
    project: Project;
    onSave: (project: Project) => void;
    onCancel: () => void;
}

// 引数に対して　’：○○○○○’　と指定することで、引数をrenameできる。
// 関数内で同一の名前をしようしている箇所などがあった場合に便利。
const ProjectForm = ({ project: initialProject ,onCancel, onSave }: ProjectFormProps) => {
    const [project, setProject] = useState(initialProject);
    
    // フォーム送信イベント
    const handleSubmit = (event: SyntheticEvent) =>{
        event.preventDefault();
        onSave(project);   
    }

    // input更新イベント
    const handleChange = (event: any) =>{
        const {type, name, value, checked} = event.target;

        // typeがcheckboxであれば、checkedを使用する。
        // それ以外の場合、valueを使用する。
        let updateValue = type === 'checkbox' ? checked : value;

        // typeがnumberの場合、更新値を文字列から数値型に変換する。
        if(type === 'number'){
            updateValue = Number(updateValue);
        }

        const change = {
            [name]: updateValue,
        };

        // 変更のある部分をスプレッド構文によって更新する。
        // 新しいインスタンスを作成し、stateで保持されていた値と入力値をマージしたものを格納し、
        // stateを更新する。
        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({...p, ...change});
            return updatedProject;
        })
    }

    return (
        <form className='input-group vertical'
            onSubmit={handleSubmit}
        >
            {/* 名前 */}
            <label htmlFor='name'>Name</label>
            <input 
                type="text"
                name='name'
                placeholder='enter name'
                value={project.name}
                onChange={handleChange}
            />

            {/* 説明 */}
            <label htmlFor="description">Project Description</label>
            <textarea 
                name="description" 
                placeholder='enter description'
                value={project.description}
                onChange={handleChange}
            />

            {/* 予算 */}
            <label htmlFor="budget">Project Budget</label>
            <input 
                type="number" 
                name='budget' 
                placeholder='enter budget'
                value={project.budget}
                onChange={handleChange}
            />

            {/* Active */}
            <label htmlFor="isActive">Active?</label>
            <input 
                type="checkbox" 
                name='isActive' 
                checked={project.isActive}
                onChange={handleChange}
            />

            {/* ボタン */}
            <div className='input-group'>
                {/* 保存ボタン */}
                <button className='primary bordered medium'>Save</button>
                <span></span>
                {/* キャンセルボタン */}
                <button type='button' className='bordered medium'
                    onClick={onCancel}
                >Cancel</button>
            </div>
        </form>      
    );
};

export default ProjectForm