from django import forms
from .models import Post, Comment

class PostForm(forms.ModelForm):
	"""docstring for PostForm"""
	class Meta:
		model=Post
		fields=('title', 'text','image',)

class CommentForm(forms.ModelForm):
	"""docstring for PostForm"""
	class Meta:
		model=Comment
		fields=('author', 'text',)
		