package com.portfolio.cms.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.portfolio.cms.entity.Message;
import com.portfolio.cms.repository.MessageRepository;

@RestController
@RequestMapping("/contact")
public class ContactController {
    private final MessageRepository repository;
    public ContactController(MessageRepository repository) { this.repository = repository; }

    @PostMapping
    public Message create(@RequestBody Message message) { return repository.save(message); }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Message> all() { return repository.findAll(); }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public Message markRead(@PathVariable Long id) {
        Message message = repository.findById(id).orElseThrow(() -> new RuntimeException("Message not found: " + id));
        message.setRead(true);
        return repository.save(message);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) { repository.deleteById(id); }
}
