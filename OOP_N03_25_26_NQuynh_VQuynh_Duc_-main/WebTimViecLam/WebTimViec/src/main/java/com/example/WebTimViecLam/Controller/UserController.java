package com.example.WebTimViecLam.Controller;


import com.example.WebTimViecLam.Reponse.UserCreateRequest;
import com.example.WebTimViecLam.Reponse.UserResponse;
import com.example.WebTimViecLam.Reponse.UserUpdateRequest;
import com.example.WebTimViecLam.Service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET /api/users?page=0&size=20&sort=createdAt,desc&kw=abc
    @GetMapping
    public ResponseEntity<Page<UserResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort,
            @RequestParam(required = false, name = "kw") String keyword
    ) {
        String[] s = sort.split(",");
        Sort sortObj = s.length == 2 ? Sort.by(Sort.Direction.fromString(s[1]), s[0])
                : Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sortObj);
        return ResponseEntity.ok(userService.findAll(pageable, keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> get(@PathVariable String id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserResponse> create( @RequestBody UserCreateRequest req) {
        return ResponseEntity.ok(userService.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable String id,  @RequestBody UserUpdateRequest req) {
        return ResponseEntity.ok(userService.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
