import { setUpForm } from './lib/setUpForm.js'
import { setUpDialog } from './lib/setUpDialog.js'
import './partials/fileBtn.js'

setUpDialog('#newFolderDialog', '#newFolderDialogButton')
setUpDialog('#uploadDialog', '#uploadDialogButton')

setUpForm('#new-folder-form')
setUpForm('#upload-form')
