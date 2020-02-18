from django.forms import ModelForm
from django import forms
from django.core import validators

# define the class of a form
from database.models import *

class CommentForm(ModelForm):
    class Meta:
        # write the name of models for which the form is made
        model = Comments

        # Custom fields, if they are here its required
        fields =["username", "comment"]

    # this function will be used for the validation
    def clean(self):

        # data from the form is fetched using super function
        super(CommentForm, self).clean()

        # extract the username and text field from the data
        username = self.cleaned_data.get('username')
        comment = self.cleaned_data.get('comment')
        ipaddy = self.cleaned_data.get('ipaddy')

        # conditions to be met
        if username is None or comment is None:
            raise forms.ValidationError('Invalid fields, user & comment required')

        # if len(username) < 5:
        #     self._errors['username'] = self.error_class([
        #         'Minimum 5 characters required'])

        # return any errors if found
        return self.cleaned_data
