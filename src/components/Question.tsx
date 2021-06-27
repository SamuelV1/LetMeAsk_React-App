import React from 'react'
import '../styles/question.scss'
import { ReactNode } from 'react'


type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswred?: boolean;
    isHighlighted?: boolean;

}
export function Question({
    content,
    author,
    isAnswred = false,
    isHighlighted = false,
    children,
}: QuestionProps) {

    return (
        <div
            className={`question ${isAnswred ? 'answred' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}
