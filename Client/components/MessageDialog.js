import React, { useRef, useState } from 'react';
import { Dialog, Paragraph, Button, Portal } from 'react-native-paper';
import { DialogType } from '../constants/Enums';

export class DialogState {
    constructor() {
        [this.state, this.setState] = useState({
            title: '',
            message: '',
            mode: DialogType.DISPLAY,
            visible: false,
            acceptBtnTitle: 'OK',
            declineBtnTitle: 'CANCEL'
        })
        this.defaultState = {
            title: '',
            message: '',
            mode: DialogType.DISPLAY,
            visible: false,
            acceptBtnTitle: 'OK',
            declineBtnTitle: 'CANCEL'

        }
        this.hidden = useRef(false)
        this.response = useRef(false)
    }

    openDialog = async ({title='Alert', message='', mode=DialogType.DISPLAY, acceptBtnTitle="OK", declineBtnTitle="CANCEL"}={}) => {
        this.setState({
            title: title,
            message: message,
            mode: mode,
            visible: true,
            acceptBtnTitle: acceptBtnTitle,
            declineBtnTitle: declineBtnTitle
        })
        
        this.hidden.current = false
        
        while (this.hidden.current == false) {
            await new Promise(r => setTimeout(r, 500));
        }

        return this.response.current
    }

    hideDialog = (buttonPress='ACCEPT') => {
        if (buttonPress == 'ACCEPT') {
            this.response.current = true
        } else if (buttonPress == 'DECLINE') {
            this.response.current = false
        }

        this.setState(this.defaultState)
        this.hidden.current = true
    }
}

export const MessageDialog = ({props}) => {
    return (
        <Portal>
            <Dialog visible={props.state.visible} onDismiss={() => props.state.visible = false}>
                <Dialog.Title>{props.state.title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{props.state.message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => {props.hideDialog('ACCEPT')}}>
                        {props.state.acceptBtnTitle}
                    </Button>
                    {props.state.mode == DialogType.INTERACTIVE ?
                        <Button onPress={() => {props.hideDialog('DECLINE')}}>
                            {props.state.declineBtnTitle}
                        </Button> : null
                    }
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};