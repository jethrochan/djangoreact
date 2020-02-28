from django.urls import include, path
# from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'todo'

urlpatterns = [
    path('', views.TodoView.as_view(), name='todo'),
    path('<int:pk>', views.TodoDetailView.as_view(), name='todo-detail'),
]
