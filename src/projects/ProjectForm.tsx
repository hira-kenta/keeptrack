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
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    });

    // フォーム送信イベント
    const handleSubmit = (event: SyntheticEvent) =>{
        event.preventDefault();
        if(!isValid()) return;
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

        // 更新値にエラーが無いか検証する。
        setErrors(() => validate(updatedProject));
    }

    //　Formバリデーション機能
    const validate = (project: Project) => {
        let errors: any = {name: '', description: '', budget: ''};
        // Nameチェック
        if(project.name.length === 0){
            errors.name = 'Name is required.';
        }
        if(project.name.length > 0 && project.name.length < 3){
            errors.name = 'Name needs to be at least 3 characters.';
        }

        // Descriptionチェック
        if(project.description.length === 0)
        {
            errors.description = 'Description is required.';
        }
        
        // Budgetチェック
        if(project.budget === 0){
            errors.budget = 'Budget must be more than $0.';
        }

        return errors;
    }
    const isValid = () => {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
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
            {errors.name.length > 0 &&(
                <div className='card error'>
                    <p>{errors.name}</p>
                </div>
            )}

            {/* 説明 */}
            <label htmlFor="description">Project Description</label>
            <textarea 
                name="description" 
                placeholder='enter description'
                value={project.description}
                onChange={handleChange}
            />
            {errors.description.length > 0 &&(
                <div className='card error'>
                    <p>{errors.description}</p>
                </div>
            )}

            {/* 予算 */}
            <label htmlFor="budget">Project Budget</label>
            <input 
                type="number" 
                name='budget' 
                placeholder='enter budget'
                value={project.budget}
                onChange={handleChange}
            />
            {errors.budget.length > 0 &&(
                <div className='card error'>
                    <p>{errors.budget}</p>
                </div>
            )}

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