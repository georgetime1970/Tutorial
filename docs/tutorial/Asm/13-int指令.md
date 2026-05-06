# int 指令

## int 指令

```asm
int n       ; 引发 n 号中断
```

`int n` 执行的中断过程与内中断完全相同：

```
1. pushf
2. TF=0, IF=0
3. push CS
4. push IP
5. IP = (n*4)，CS = (n*4+2)
```

`int n` 和 `iret` 搭配，实现**调用中断例程**的机制，类似调用子程序。

## 编写供应用调用的中断例程

### 示例：编写 7ch 中断例程，实现 loop 的功能

**功能约定：**

- (cx) = 循环次数
- (bx) = 位移量（距离 int 7ch 指令的偏移差）

**使用方式：**

```asm
; 等同于：loop s（即 s: ... loop s 的效果）
s:  add ax, bx
    ...
    dec cx
    jcxz ok
    mov bx, offset s - offset ok    ; bx = 负偏移（向前跳）
    int 7ch
ok: ...
```

**7ch 中断例程的实现：**

```asm
lp:     push bp
        mov bp, sp
        dec cx
        jcxz lpret
        add [bp+2], bx      ; 修改栈中保存的 IP（即 int 7ch 的下一条指令的地址）
lpret:  pop bp
        iret
```

**原理：**  
`int 7ch` 执行时，栈的状态（从高到低）：`FLAG | CS | IP_next`  
`push bp` 后，SP 指向 bp 的槽，`[bp+2]` 就是 IP_next（即 int 7ch 后的地址）。  
通过修改栈中 IP，`iret` 返回时会跳到 `IP_next + bx` 处，实现跳转。

## BIOS 和 DOS 中断例程

**中断例程的来源：**

| 来源      | 说明                      |
| --------- | ------------------------- |
| BIOS 例程 | 固化在 ROM 中，上电即可用 |
| DOS 例程  | 由 DOS 加载器安装到内存   |

### BIOS 启动过程

```
上电 → CPU 从 FFFF:0 执行第一条 jmp 指令
     → 硬件检测 + 初始化
     → 建立 BIOS 中断向量表（安装中断例程）
     → int 19h（引导装载，加载 DOS）
```

## int 10h（BIOS 显示服务）

### 设置光标位置（ah=2）

```asm
mov ah, 2       ; 功能 2：设置光标
mov bh, 0       ; 页号（文本模式下通常为 0）
mov dh, 5       ; 行号（0~24）
mov dl, 12      ; 列号（0~79）
int 10h
```

### 在光标处显示字符（ah=9）

```asm
mov ah, 9       ; 功能 9：显示字符
mov al, 'A'     ; 字符 ASCII 码
mov bh, 0       ; 页号
mov bl, 7       ; 颜色属性（0=黑底白字等）
mov cx, 3       ; 重复次数
int 10h
```

**组合示例：** 在第 5 行第 12 列显示 3 个红色 `A`：

```asm
assume cs:code

code segment
start:
    mov ah, 2       ; 设置光标
    mov bh, 0
    mov dh, 5
    mov dl, 12
    int 10h

    mov ah, 9       ; 显示字符
    mov al, 'A'
    mov bh, 0
    mov bl, 2       ; 颜色：绿色
    mov cx, 3
    int 10h

    mov ax, 4c00h
    int 21h
code ends
end start
```

## int 21h（DOS 服务）

### 显示字符串（ah=9）

```asm
mov ah, 9
mov dx, offset 字符串   ; ds:dx 指向字符串
int 21h
; 字符串必须以 '$' 结尾
```

示例：

```asm
assume cs:code, ds:data

data segment
    db 'Hello, World!', '$'
data ends

code segment
start:
    mov ax, data
    mov ds, ax
    mov dx, 0           ; ds:0 指向字符串
    mov ah, 9
    int 21h

    mov ax, 4c00h
    int 21h
code ends
end start
```

## 综合示例：用 BIOS 在指定位置显示字符串

结合 int 10h 的光标设置（ah=2）和字符显示（ah=9）：

```asm
assume cs:code

code segment
start:
    ; 在第 10 行第 10 列开始显示 "Hello!" 白色
    mov ah, 2
    mov bh, 0
    mov dh, 10
    mov dl, 10
    int 10h

    mov ax, cs
    mov ds, ax
    mov si, offset str

show:
    mov ah, 9
    mov al, cs:[si]
    cmp al, 0
    je done
    mov bh, 0
    mov bl, 7
    mov cx, 1
    int 10h

    ; 光标右移
    mov ah, 3       ; 读光标（ah=3 返回光标位置到 dh/dl）
    mov bh, 0
    int 10h
    inc dl
    mov ah, 2
    int 10h

    inc si
    jmp show

done:
    mov ax, 4c00h
    int 21h

str db 'Hello!', 0
code ends
end start
```
