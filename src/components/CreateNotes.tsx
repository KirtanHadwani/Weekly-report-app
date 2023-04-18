import * as React from 'react';
import Button from 'react-bootstrap/Button'
import { Note } from '../models/note.model';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

interface ICreateNotesProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const CreateNotes: React.FunctionComponent<ICreateNotesProps> = ({notes, setNotes}) => {
    const [errorweek, setErrorWeek] = React.useState<string>("");
    const [errordes, setErrorDes] = React.useState<string>("");
    const titleRef = React.useRef<HTMLInputElement | null>(null);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const colorRef = React.useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (titleRef.current?.value === "" ) {
            return setErrorWeek("Please enter week");
        }
        if(textRef.current?.value === "") {
            return setErrorDes("Please enter description");
        }
        
        
        setNotes([...notes, {
            id: (new Date()).toString(),
            title: (titleRef.current as HTMLInputElement).value,
            text: (textRef.current as HTMLTextAreaElement).value,
            color: (colorRef.current as HTMLInputElement).value,
            date: (new Date()).toString()
        }]);
        
        (titleRef.current as HTMLInputElement).value = "";
        (textRef.current as HTMLTextAreaElement).value = "";

    }

    return (
        <>
            <h2>Create Notes</h2>
            
            <Form className="mt-3 mb-3" onSubmit={(e) => handleSubmit(e) }>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                
                    <Form.Label>Week</Form.Label>
                    {errorweek && <Alert variant="danger">{ errorweek}</Alert>}
                   
                    <Form.Control type="text" placeholder="Enter Week Number" ref={ titleRef }/>
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">

                    <Form.Label>Description of the work done in brief</Form.Label>
                    {errordes && <Alert variant="danger">{ errordes}</Alert>}
                    <Form.Control placeholder="Enter text here.." as="textarea" rows={3} ref={ textRef }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Notes Color</Form.Label>
                    <Form.Control type="color" id="colorInput" defaultValue="#a6ff4d" title="Choose your color" ref={ colorRef }/>
                </Form.Group>
                <Button type="submit" variant="primary">Save</Button>
            </Form>
        </>
  );
};

export default CreateNotes;
