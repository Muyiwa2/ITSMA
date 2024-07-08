document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(feedbackForm);
            fetch('api/add_feedback.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    alert('Feedback submitted successfully');
                    feedbackForm.reset();
                }
            });
        });
    }
    
    if (document.getElementById('faqs')) {
        fetch('api/faqs.php')
            .then(response => response.json())
            .then(faqs => {
                const faqsContainer = document.getElementById('faqs');
                faqsContainer.innerHTML = '';  // Clear existing content
                if (faqs.error) {
                    faqsContainer.innerHTML = `<p>Error: ${faqs.error}</p>`;
                    return;
                }
                faqs.forEach(faq => {
                    const faqDiv = document.createElement('div');
                    faqDiv.className = 'faq';
                    const question = document.createElement('h3');
                    question.textContent = faq.question;
                    const answer = document.createElement('p');
                    answer.textContent = faq.answer;
                    faqDiv.appendChild(question);
                    faqDiv.appendChild(answer);
                    faqsContainer.appendChild(faqDiv);
                });
            })
            .catch(error => {
                document.getElementById('faqs').innerHTML = `<p>Error fetching FAQs: ${error.message}</p>`;
            });
    }
});
